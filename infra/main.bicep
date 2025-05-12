param location string = resourceGroup().location
param appServicePlanName string = 'weatherme-plan'
param webAppName string = 'weatherme-api-${uniqueString(resourceGroup().id)}'
param postgresServerName string = 'weathermedb${uniqueString(resourceGroup().id)}'
param postgresAdmin string = 'weathermeadmin'
@secure()
param postgresPassword string

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  location: location
  kind: 'app,linux'  
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|8.0'
      appSettings: [
        {
          name: 'ASPNETCORE_ENVIRONMENT'
          value: 'Production'
        }
        {
          name: 'ConnectionStrings__DefaultConnection'
          value: 'Host=${postgresServer.name}.postgres.database.azure.com;Database=weatherme;Username=${postgresAdmin}@${postgresServer.name};Password=${postgresPassword};Ssl Mode=Require'
        }
      ]
    }
    httpsOnly: true
  }
}

resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01' = {
  name: postgresServerName
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'    
  }
  properties: {
    administratorLogin: postgresAdmin
    administratorLoginPassword: postgresPassword
    version: '14'
    storage: {
      storageSizeGB: 32
    }
    highAvailability: {
      mode: 'Disabled'
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    network: {
      publicNetworkAccess: 'Enabled'
    }
    createMode: 'Default'
  }
}

resource postgresDb 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2022-12-01' = {
  parent: postgresServer
  name: 'weatherme'
  properties: {}
}

output webAppName string = webApp.name
output webAppDefaultHostName string = webApp.properties.defaultHostName
output postgresServerFqdn string = postgresServer.properties.fullyQualifiedDomainName
output postgresConnectionString string = 'Host=${postgresServer.name}.postgres.database.azure.com;Database=weatherme;Username=${postgresAdmin}@${postgresServer.name};Password=${postgresPassword};Ssl Mode=Require'
