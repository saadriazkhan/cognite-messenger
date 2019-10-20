import { Component } from '@angular/core';
import { Chat, ChatMessage } from './models/chat-message';
import { ChatService } from './chat-service.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	chats: Chat[] = [
		{ id: "1", name: "Saad Riaz" },
		{ id: "2", name: "Hamza Iqbal" },
	];

	selectedChat: Chat = this.chats[0];

	chatMessages: ChatMessage[] = [];

	textMessage: string = "";

	constructor(private service: ChatService) {
		this.service.messageSubject.subscribe(data => {
			this.chatMessages = data as ChatMessage[];
		});
		this.service.newMessageSubject.subscribe(data => {
			this.chatMessages.push(data as ChatMessage);
		});
	}

	ngOnInit() {
		this.service.getChatHistoryById(this.chats[0].id);
		// this.service.establishSocketConnection(this.chats[0].id);
	}

	selectChat(chat: Chat) {
		if (this.selectedChat.id != chat.id) {
			this.selectedChat = chat;
			this.service.unsubscribeToChannel();
			this.service.getChatHistoryById(chat.id);
			this.service.establishSocketConnection(chat.id);
		}
	}

	addToChat() {
		this.chatMessages.push({
			id: this.selectedChat.id,
			message: this.textMessage,
			byMe: true
		});
		this.service.sendText(this.selectedChat.id, this.textMessage);
		this.textMessage = "";
	}

}
