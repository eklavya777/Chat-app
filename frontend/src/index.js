import express from "express";
import path from "path";
import bodyParser from "body-parser";
import pg from "pg";
import cors from 'cors';


const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "chatDatabase",
  password: "sagitario@123",
  port: 5432,
});
db.connect();

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.static("public"));
app.use(cors());


app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    console.log("db call start");

    const result = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id", [username, password]);

    console.log("db call done");

    if (result && result.rows && result.rows[0] && result.rows[0].id) {
      const loggedInUserId = result.rows[0].id;
      console.log("loggedInUserId :", loggedInUserId);
      sharedData.loggedInUserId = loggedInUserId;
      res.sendStatus(201);
      res.json({userId: loggedInUserId});
    } else {
      console.log("Error in db call - no result, rows, or id");
      res.sendStatus(500);
    }
  } catch (err) {
    console.log("Error in db call");
    console.error(err);
    res.sendStatus(500);
  }
});


app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    console.log('try chala');
    const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    const loggedInUserId = result.rows[0].id;
    
    if (result.rows.length > 0) {
     
      res.json({success:true, userId: loggedInUserId}); 
    } else { 
      res.json({success:false});
    } 
  } catch {
    console.log("catch chala");
    res.json({success:false});
  }
});

// app.post('/receiverId', async (req, res) => {
//   const selectedUserId = req.body.selectedId;
//   console.log('selectedId on the server:', selectedUserId);
//   sharedData.selectedUserId = selectedUserId;
//   res.json({ message: 'selectedUserId received successfully' });
// })

// app.post('/sendMessage', async (req, res) => {
//   const loggedInUserId = sharedData.loggedInUserId;
//   const selectedUserId = sharedData.selectedUserId;

//   try {
//        const { message } = req.body;
//        await db.query("INSERT INTO messages (sender_userid, receiver_userid, text) VALUES ( $1 , $2, $3 )", [loggedInUserId, selectedUserId, message]);
//        console.log(`Sent message: ${message} from: ${loggedInUserId} To: ${selectedUserId}`);
//        res.sendStatus(201);
//   }
//       catch(err){
//         console.log('error in inserting message');
//         console.error(err);
//         console.log('here');
//         res.sendStatus(500); 
//       }
// });

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    const users = result.rows;
    res.json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.get('/refresh', async (req, res) => {
//   const senderId = sharedData.senderId;
//   const receiverId = receiver_userid.receiverId;  

//   try {
//     const result = await db.query(`
//       SELECT text
//       FROM messages
//       WHERE sender_userid = $1 AND receiver_userid = $2
//       ORDER BY timestamp_column
//     `, [senderId, receiverId]);

//     const texts = result.rows;
//     res.json({ texts, senderId, receiverId}); 
//   } catch (error) {
//     console.error('Error fetching messages', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
