import WAWebJS from "whatsapp-web.js";

export const findMessageWithMedia = async (
  message: WAWebJS.Message
): Promise<WAWebJS.Message | null> => {
  if (message.hasMedia) return message;

  const quotedMessage = await message.getQuotedMessage();
  if (!quotedMessage) return null;

  return findMessageWithMedia(quotedMessage);
};
