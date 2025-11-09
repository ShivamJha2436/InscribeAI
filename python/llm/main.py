from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os

app = Flask(__name__)
CORS(app)

# GPT4All model path (update this to your model path)
MODEL_PATH = os.getenv("GPT4ALL_MODEL_PATH", "models/ggml-model.bin")

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")
        max_tokens = data.get("max_tokens", 1000)

        if not prompt:
            return jsonify({"error": "prompt is required"}), 400

        # Call GPT4All CLI or library
        # This is a placeholder - you'll need to implement actual GPT4All integration
        # For now, we'll return a mock response
        
        # Example using gpt4all library (install: pip install gpt4all)
        try:
            from gpt4all import GPT4All
            
            model = GPT4All(MODEL_PATH)
            response = model.generate(prompt, max_tokens=max_tokens, temp=0.7)
            
            return jsonify({
                "content": response,
                "error": None
            })
        except ImportError:
            # Fallback mock response if GPT4All is not installed
            return jsonify({
                "content": f"[Mock AI Response] This is a generated response for: {prompt[:50]}...",
                "error": None
            })
        except Exception as e:
            return jsonify({
                "content": "",
                "error": str(e)
            }), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)

