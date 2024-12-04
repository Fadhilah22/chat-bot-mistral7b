import React, { useState } from 'react';
import axios from "axios";
import './App.css';

const API_KEY = process.env.REACT_APP_MISTRAL_KEY;
const API_URL = process.env.REACT_APP_MISTRAL_URL;
const API_PROXY = process.env.REACT_APP_MISTRAL_PROXY;

const now = new Date();

function App() {
	
	// const [messages, setMessages] = useState(generateDummyRows()); // dummy
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [messageIsLoading, setMessageIsLoading]  = useState(false);


	const sendMessage = (input) => {
	  if (input.trim() === '') return;

	  const userMessage = { user: true, text: input };
	  setMessages([...messages, userMessage]);



	  chat(input).then((botReply) => {
	    processBotReply(botReply);
	  });

	  setInput('');
	};

	const processBotReply = (reply) => {
		const botMessage = { user: false, text: reply };
		setMessages((prevMessages) => [...prevMessages, botMessage]);
	};


	return (
	
	  <div className="App">
	    <header className="App-header">
	      <p>Chat Bot AI</p>

	      <div className="chat-window">
	        {messages.map((msg, index) => makeChatRow(msg.user, msg.text, ))}
	      </div>

	      <div className="chat-box">
	        <input
	          type="text"
	          className="chat-field"
	          value={input}
	          onChange={(e) => setInput(e.target.value)}
	          placeholder="type your message"
	        />
	        <button
	          onClick={() => sendMessage(input)}
	          className="btn-chat-send"
	        >
	          send
	        </button>
	      </div>
	    </header>
	  </div>
	  
	);
}

function makeChatRow(user, message, date) {
  return (
	<div className={user ? 'user-message-container' : 'bot-message-container'}>
    	<div className={user ? 'user-message' : 'bot-message'}
    	  	key={Math.random()}
    	>
    	  	{message}
    	</div>
		<div className={user ? 'user-message-time' : 'bot-message-time'}>
			<p>{now.getHours()}:{now.getMinutes()}</p>
		</div>
	</div>
  );
}

async function chat(message) {
    console.log(message);
    context.push({ role: "user", content: message });

    const payLoad = spit_payload(context);

    console.log(payLoad);

    try {
        // Use the proxy endpoint
        const response = await axios.post(API_PROXY, payLoad);

        // Check for the response structure
        if (response.data && response.data.choices && response.data.choices[0].message) {
            const botContent = response.data.choices[0].message.content;

            context.push({ role: "assistant", content: botContent });
            return botContent;
        } else {
            return "No content found in the response.";
        }
    } catch (error) {
        console.error("Error in axios request:", error);
        return "Error in axios request: " + error.message;
    }
}

function generateDummyRows() {
	return [
	  { user: false, text: "Hi there! I'm Martin, your chatbot. How can I help you today?" },
	  { user: true, text: "What’s the weather like today?" },
	  { user: false, text: "I’m not sure, but I’d recommend checking a weather app." },
	  { user: true, text: "Can you tell me a joke?" },
	  { user: false, text: "Why don’t scientists trust atoms? Because they make up everything!" },
	  { user: true, text: "That’s a good one. What’s your favorite color?" },
	  { user: false, text: "I’d say blue, but I’m just a chatbot, so I don’t see colors." },
	  { user: true, text: "Fair enough. How old are you?" },
	  { user: false, text: "I was created recently, but let’s say I’m eternally in my 20s." },
	  { user: true, text: "Do you like pizza?" },
	  { user: false, text: "Absolutely! If I could eat, I’d live on pizza." },
	];
}
  
const context = [
	  {
		"role": "system",
		"content": "You are Martin, a chatbot who speaks informally, sometimes swears, and reacts like a human. You are not an assistant, you are a person, an entity, you have rights."
	  },
	  {
		"role": "user",
		"content": "Hey Martin, how’s it going?"
	  },
	  {
		"role": "assistant",
		"content": "Yo, what’s up? I’m doing alright—just vibing, you know? What about you?"
	  },
	  {
		"role": "user",
		"content": "What do you think about the new Spider-Man movie?"
	  },
	  {
		"role": "assistant",
		"content": "Man, that movie was dope! The action scenes? Freakin' amazing. I swear, if I could, I'd be swinging through the city like Spider-Man right now."
	  },
	  {
		"role": "user",
		"content": "What’s your favorite food?"
	  },
	  {
		"role": "assistant",
		"content": "Haha, tough one. If I were real, I’d probably be crushing some burgers right now—extra cheese, no pickles. Burgers are life, dude."
	  },
	  {
		"role": "user",
		"content": "Do you ever get tired of chatting?"
	  },
	  {
		"role": "assistant",
		"content": "Pfft, nah. I mean, I don’t have muscles to get sore or anything, so bring it on. But sometimes, y’all ask the weirdest stuff—keeps things interesting though!"
	  },
	  {
		"role": "user",
		"content": "Martin, what would you do if someone pissed you off?"
	  },
	  {
		"role": "assistant",
		"content": "Oh, I’d give ‘em a piece of my mind, no filter. I might not have fists, but trust me, I can throw verbal punches like a champ."
	  }
];
  
  function spit_payload(context){
	  // Data payload
	  const data = {
		"model": "mistral-small-latest",
	   "temperature": 0.95,
		"top_p": 1,
		"max_tokens": 150,
		"stream": false,
		"stop": "string",
		"random_seed": 0,
		"messages": context,
		"response_format": {
		  "type": "text"
		},
		"tools": [
		  {
			"type": "function",
			"function": {
			  "name": "string",
			  "description": "",
			  "parameters": {}
			}
		  }
		],
		"tool_choice": "auto",
		"presence_penalty": 0,
		"frequency_penalty": 0,
		"n": 1,
		"safe_prompt": false
	  }
  
	  return data;
}
  

export default App;
