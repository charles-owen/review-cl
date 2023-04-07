/**
 * Factory class to create Interact object and install Interact system
 * @constructor
 */
export const ChatFactory = function() {
}

/**
 * Create the Interact object and install Interact system
 * @param {Site} site
 * @returns {Interact}
 */
ChatFactory.create = function(site) {

  const chat = new Chat(site);

  return chat;
  );
