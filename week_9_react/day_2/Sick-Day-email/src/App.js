import './App.css';
const name = "achraf";
const hours = () => {
  let date = new Date();
  let hours = date.getHours();
  return hours;
}
function App() {
  return (
    <div className="App">
          <h1>Hi {name},</h1>  
          <p id='p1'>
          I wanted to let you know as soon as possible that I will be staying home from work today.
          </p>
          <p id='p2'>
          Unfortunately, I developed a stomach bug that has made it very difficult to get work done.
          </p>
          <p id='p3'>
          I went to urgent care last night and was told it should subside within <span>{hours()}</span> hours. I do not expect to be online throughout the day.
          </p>
          <p id='p4'>
          While I do plan to be back in the office tomorrow, I’ve asked Kelly to take over for me today in case any emergencies arise. I had an important call scheduled with a supplier, but Daniel has agreed to manage the meeting.
          </p>
          <p id='p5'>
          Please let me know of any additional steps you’d like me to take to ensure the day runs as smoothly as possible in my absence.
          </p>
          <br/>
          <h2>
          Thank you,
          </h2>
          <p>
          {name}
          </p>
    </div>
  );
}

export default App;
