import React from 'react'

const Messages = ({ messages }) => {
    if(messages.length === 0) {
        return (
            <div style={{ textAlign: 'center' }}>No chat has begun yet</div>
        )
    }
    return (
        <div className=''>
            <div className='max-h-36 max-w-lg overflow-y-scroll no-scrollbar'>
                {messages.map(message => 
                    <div>
                        <div className='font-bold'>
                            {message.name}
                        </div>
                        <div className='ml-2'>
                            {message.message}
                        </div>
                    </div>)
                }
            </div>
        </div>
        
    )
}

export default Messages;