/**
 * Chat central (system) object
 * @param {Site} site The Site object
 * @constructor
 */
export const Chat = function(site) {

  /**
   * Start polling for Chat
   * Installs pre and post polling handlers
   */
  this.startPolling = function() {
    site.polling.addClient('chat', (params) => {
      params.chat = {

      };
    }, (response) => {
    });
  }

  this.endPolling = function() {
    site.polling.removeClient('chat');
  }
}
