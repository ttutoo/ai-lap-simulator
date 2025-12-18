
import { GoogleGenAI, Type } from "@google/genai";

// Use Gemini AI to simulate the logic of various security handlers
export async function simulateHandlerLogic(handlerName: string, requestType: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bạn là một chuyên gia bảo mật hệ thống. Hãy phân tích xem yêu cầu sau có vượt qua được lớp kiểm tra này không.
      Lớp kiểm tra (Handler): ${handlerName}
      Loại yêu cầu (Request): ${requestType}
      
      Quy tắc:
      - Nếu là SQL Injection, phải bị chặn ở Firewall.
      - Nếu là Expired Token, phải bị chặn ở Authentication.
      - Nếu là DDoS, phải bị chặn ở Rate Limiter.
      - Nếu thiếu trường dữ liệu, phải bị chặn ở Validation.
      
      Trả về JSON:
      {
        "decision": "PASS" hoặc "FAIL",
        "reason": "Giải thích ngắn gọn lý do bằng tiếng Việt",
        "logs": "Mã lỗi kỹ thuật (vd: ERR_401, OK_200)"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            decision: { type: Type.STRING },
            reason: { type: Type.STRING },
            logs: { type: Type.STRING }
          },
          required: ["decision", "reason", "logs"]
        }
      }
    });

    // Safely extract and parse the JSON response
    const text = response.text?.trim();
    if (!text) {
      throw new Error("AI response text is empty or undefined");
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Simulation Error:", error);
    return { 
      decision: "FAIL", 
      reason: "Hệ thống AI gặp sự cố khi phân tích. Vui lòng thử lại.", 
      logs: "SYS_ERR_500" 
    };
  }
}

