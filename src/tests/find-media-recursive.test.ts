import { describe, it, expect, vi } from "vitest";
import WAWebJS from "whatsapp-web.js";
import { findMessageWithMedia } from "../helpers/find-media-recursive";

describe("find message with media", () => {
  it("should return the actual sent message", async () => {
    const message = { id: 1, hasMedia: true } as unknown as WAWebJS.Message;

    const result = await findMessageWithMedia(message);

    expect(result?.id).toBe(message.id);
    expect(result).not.toBeNull();
  });

  it("should return null when the message has no media and no quoted message", async () => {
    const message = {
      id: 1,
      hasMedia: false,
      getQuotedMessage: vi.fn(async () => null),
    } as unknown as WAWebJS.Message;

    const result = await findMessageWithMedia(message);

    expect(message.getQuotedMessage).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("should return the quoted message when the message has no media", async () => {
    const quotedMessage = { id: 2, hasMedia: true };
    const message = {
      id: 1,
      hasMedia: false,
      getQuotedMessage: vi.fn(async () => quotedMessage),
    } as unknown as WAWebJS.Message;

    const result = await findMessageWithMedia(message);

    expect(message.getQuotedMessage).toHaveBeenCalled();
    expect(result?.id).toBe(quotedMessage.id);
    expect(result).not.toBeNull();
  });
});
