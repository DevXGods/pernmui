import {useState,useEffect} from 'react'
import {useNavigate,useParams } from 'react-router-dom'
import {Card, CardContent, Grid, TextField, Typography,Button, CircularProgress} from '@mui/material'

const TaskForm = () => {

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

const [loading,setLoading] = useState(false)
const [editing, setEditing] = useState(false);



  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const response = await fetch(
          "http://localhost:4000/tasks/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
          }
        );
        await response.json();
      } else {
        const response = await fetch("http://localhost:4000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        await response.json();
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

const handleChange = e => 
  setTask({ ...task, [e.target.name]: e.target.value });


  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const loadTask = async (id) => {
    const res = await fetch("http://localhost:4000/tasks/" + id);
    const data = await res.json();
    setTask({ title: data.title, description: data.description });
    setEditing(true);
  };

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1E272E",
            padding: "1rem",
          }}>
          <Typography variant='5' textAlign='center' color='white'>
            Create a Task
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>

              <TextField variant="filled"
                label="Write your Title"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="title"
                value={task.title}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                />
              
              <TextField variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                value={task.description}
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                />

                <Button type="submit"
                variant="contained"
                color="primary"
                disabled={!task.title || !task.description}
                >
                  {loading ? ( <CircularProgress
                    color='inherit' size={24} />) : ('Create')}     
                </Button>

            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TaskForm