import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Socket } from 'phoenix';


@Injectable({
	providedIn: 'root'
})
export class ChatService {

	url: string = "";
	lastNmessages: number = 50;

	messageSubject = new Subject();
	newMessageSubject = new Subject();

	socket: any = new Socket(environment.websocket);
	channel: any;

	constructor(private http: HttpClient) {
		this.url = environment.apiUrl;
	}

	// commenting the socket connection code which is responsible for communication
	establishSocketConnection(userChatId: string) {
		// this.socket = new Socket(environment.websocket, {
		// 	heartbeatIntervalMs: 20000,
		// });
		// this.socket.connect();

		// this.socket.onError(() => console.log("there was an error with the connection!"));
		// this.socket.onClose(() => console.log("the socket connection dropped!"));

		// this.channel = this.socket.channel(`user:${userChatId}`);
		// console.log('User chat channel: ', this.channel);
		// this.channel.join()
		// 	.receive("ok", () => console.log("Connected with user chat channel!"))
		// 	.receive("error", (reason) => console.log("error in user channel", reason))
		// 	.receive("timeout", () => console.log("Networking issue. Still waiting..."))
			// .receive("message", (message) => {
			// 	console.log("recieved");
			// 	this.newMessageSubject.next(message);
			// });
	}

	unsubscribeToChannel() {
		// if (this.channel) {
		// 	this.channel.leave();
		// 	this.channel = null;
		// }
		// if (this.socket) {
		// 	this.socket.disconnect();
		// 	this.socket = null;
		// }
	}

	getChatHistoryById(id: string) {
		this.http.get(this.url, {
			params: {
				id: id
			},
		}).subscribe(data => {
			console.log(data[id]);
			// temporary implementation. 
			this.messageSubject.next(data[id]);
		});
	}

	sendText(chatId: string, message: string) {
		// this.channel.push(chatId, message);
	}
}