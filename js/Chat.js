/**
 * @param site The Site object this chat is a part of {Site}
 * @param chat_id The id of the chat (reviewer/reviewee pairing) in the database {string}
 * @param reviewChat The chat vue template {ReviewChatVue}
 * @constructor
 */
export const Chat = function(site, chat_id, reviewChat) {

  this.reviewChat = reviewChat;
  this.chat_id = chat_id;
  this.chat = null;
  /**
   * Start polling for Chat
   * Installs pre and post polling handlers
   */
  this.startPolling = function() {
    site.polling.addClient('chat' + this.chat_hash, (params) => {
      params.chat = {
        "chat_id": this.chat_id
      };
    }, (response) => {
      this.take(response);
    });
  }

  this.endPolling = function() {
    site.polling.removeClient('chat' + this.chat_hash);
  }

  this.take = function(response) {
    this.reviewChat.chat = response.getData("reviewing").attributes.filter(r => this.chat_id === r.by);
  }

  let random = (len) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  this.chat_hash = random(32);
}
