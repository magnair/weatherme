import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

// Define the type for a Task
interface Task {
  id: string;
  content: string;
}

// Define the initial state
interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface Data {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

// Initial data for the Kanban board
const initialData: Data = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Buy groceries' },
    'task-2': { id: 'task-2', content: 'Clean the house' },
    'task-3': { id: 'task-3', content: 'Finish the report' },
    'task-4': { id: 'task-4', content: 'Go for a run' },
  },
  columns: {
    'column-todo': {
      id: 'column-todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-inprogress': {
      id: 'column-inprogress',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    'column-done': {
      id: 'column-done',
      title: 'Done',
      taskIds: ['task-4'],
    },
  },
  columnOrder: ['column-todo', 'column-inprogress', 'column-done'],
};

// Main KanbanBoard component
const KanbanBoard: React.FC = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Check if destination is null (dropped outside)
    if (!destination) return;

    // If the item is dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn.id === endColumn.id) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      // Moving between different columns
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const endTaskIds = Array.from(endColumn.taskIds);
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEndColumn = {
        ...endColumn,
        taskIds: endTaskIds,
      };

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      }));
    }
  };

  const updateTaskContent = (taskId: string, newContent: string) => {
    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskId]: { ...prev.tasks[taskId], content: newContent },
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Grid item xs={4} key={column.id}>
              <Column title={column.title} tasks={tasks} columnId={column.id} updateTaskContent={updateTaskContent} />
            </Grid>
          );
        })}
      </Grid>
    </DragDropContext>
  );
};

// Column component to render tasks in a column
interface ColumnProps {
  title: string;
  tasks: Task[];
  columnId: string;
  updateTaskContent: (taskId: string, newContent: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, columnId, updateTaskContent }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Droppable key={columnId} droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: '#f4f5f7',
              padding: 8,
              borderRadius: 4,
              minHeight: '300px',
            }}
          >
            {tasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} updateTaskContent={updateTaskContent} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// TaskItem component to display and edit each task
interface TaskItemProps {
  task: Task;
  index: number;
  updateTaskContent: (taskId: string, newContent: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, updateTaskContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      updateTaskContent(task.id, editText); // Update task content in parent state
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(task.content); // Revert to original task content
  };

  return (
    <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: 'none',
            padding: 16,
            margin: '0 0 8px 0',
            backgroundColor: '#ffffff',
            borderRadius: 4,
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            ...provided.draggableProps.style,
          }}
        >
          <Card>
            <CardContent>
              {isEditing ? (
                <div>
                  <TextField
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                  <div style={{ textAlign: 'right', marginTop: 8 }}>
                    <IconButton onClick={handleSave} color="primary">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancel} color="secondary">
                      <CancelIcon />
                    </IconButton>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography>{task.content}</Typography>
                  <IconButton onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};





export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};


export default KanbanBoard;
