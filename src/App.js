import { useState } from "react";

function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState({
    interest1: false,
    interest2: false,
    interest3: false
  })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name || !email) {
      setError(`Name and Email are REQUIRED.`)
      return
    }
    setError('')
    setSubmitted(true)
    console.log(interests)
  }
  
  const handleInterestChange = (e) => {
    setInterests({
      ...interests,
      [e.target.name]: e.target.checked
    })
  }

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
        {submitted ? <h1>Thanks for signing up {name}!</h1> : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text"
            id="name"
            placeholder="Enter Name..."
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="text"
            id="email"
            placeholder="Enter Email..."
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="interest1"
            id="interest1"
            checked={interests.interest1}
            onChange={handleInterestChange}
          />
          <label htmlFor="interest1">Magic: The Gathering TCG</label>
          <input
            type="checkbox"
            name="interest2"
            id="interest2"
            checked={interests.interest2}
            onChange={handleInterestChange}
          />
          <label htmlFor="interest2">PokeMon TCG</label>
          <input
            type="checkbox"
            name="interest3"
            id="interest3"
            checked={interests.interest3}
            onChange={handleInterestChange}
          />
          <label htmlFor="interest3">Lorcana TCG</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

    </main>
  );
}

export default App;
