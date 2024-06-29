import React from 'react'
import newchat from "/icons/newchat.svg"

const NewChat = () => {
  return (
		<div className='flex flex-col justify-center items-center flex-grow'>
            <div><img src={newchat}/></div>
			<p>Select a friend to begin/continue a conversation</p>
		</div>
  );
}

export default NewChat
