var frameSelector = document.getElementById('client-frame')

frameSelector.onload = function() {

    var intoFrameAccess = frameSelector.contentWindow.document;

    // Check onload
    console.log('loaded')

    // Creating list in client's chat window block
    const newClientsMessageParent = intoFrameAccess.createElement('ul')
    intoFrameAccess.getElementById('chat-style').appendChild(newClientsMessageParent)


// Client's submit button
    newClientMessageUpload = function addClientMessages(){

        // Creating message block
        let newMessageBlock = intoFrameAccess.createElement('li'),
            clientsName = intoFrameAccess.createElement('h3'),
            newClientsMessage = intoFrameAccess.createElement('p'),
            clientsMessageText = intoFrameAccess.getElementById("client-textarea")

        clientsName.innerHTML = 'Client:'

        newMessageBlock.appendChild(clientsName)
        newMessageBlock.appendChild(newClientsMessage)
        newClientsMessageParent.appendChild(newMessageBlock)

        newClientsMessage.innerHTML = clientsMessageText.value
        clientsMessageText.value = ''
        console.log('true')
    }

    intoFrameAccess.getElementById("client-button").onclick = newClientMessageUpload;
}

