/**
 * Chat instance object
 * @param {string} chat_id The id of the chat in the database
 * @constructor
 */
export const Chat = function(chat_id) {

  this.chat_id = chat_id;
  this.chat = null;
  /**
   * Start polling for Chat
   * Installs pre and post polling handlers
   */
  this.startPolling = function() {
    site.polling.addClient('chat', (params) => {
      params.chat = {
        "chat_id": this.chat_id
      };
    }, (response) => {
      this.take(response);
    });
  }

  this.endPolling = function() {
    site.polling.removeClient('chat');
  }

  this.take = function(response) {
    this.chat = response.getData("reviewing").attributes.filter((review) => {
      return this.chat_id == review.by;
    });


  }

}
