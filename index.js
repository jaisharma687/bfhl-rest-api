import express from "express";

const app = express();
app.use(express.json());

// ==== Your details (customize if needed) ====
const USER_FULL_NAME = "jai_sharma"; // always lowercase, as per spec
const DOB = "27102003";              // ddmmyyyy format (example DOB, replace if required)
const EMAIL = "jai.sharma2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BCE3969";
// ===========================================

// Helper that processes the input array into the required pieces
function processArray(data) {
  const evenNumbers = [];
  const oddNumbers = [];
  const alphabets = [];
  const specialChars = [];
  let sum = 0;
  let allAlphabetChars = ""; // stash all letters to build fancy reverse+alternating caps string later

  for (const item of data) {
    const s = String(item); // normalize everything into string, so 1 and "1" behave the same

    if (/^-?\d+$/.test(s)) {
      // It's a number (positive/negative, doesn't matter)
      const num = parseInt(s, 10);
      (num % 2 === 0 ? evenNumbers : oddNumbers).push(s); // store as string
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(s)) {
      // It's pure alphabetic
      alphabets.push(s.toUpperCase()); // spec wants uppercase
      allAlphabetChars += s; // keep original chars to build concat string
    } else {
      // Anything else is considered "special"
      specialChars.push(s);
    }
  }

  // Build concatenation string:
  // Reverse all collected letters, then alternate uppercase/lowercase
  const concatString = allAlphabetChars
    .split("")
    .reverse()
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  return {
    even_numbers: evenNumbers,
    odd_numbers: oddNumbers,
    alphabets,
    special_characters: specialChars,
    sum: String(sum),
    concat_string: concatString,
  };
}

// POST endpoint -> the main API route
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      // validation fail
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' should be an array of stuff (numbers/letters/etc.)",
      });
    }

    const result = processArray(data);

    return res.status(200).json({
      is_success: true,
      user_id: `${USER_FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      ...result,
    });
  } catch (err) {
    console.error("🔥 Error processing request:", err);
    return res.status(500).json({
      is_success: false,
      message: "Something went wrong on the server",
    });
  }
});

// A lightweight GET endpoint just to prove the API is alive
app.get("/bfhl", (_req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Health-check route at "/"
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "🚀 BFHL API is up and running",
    endpoints: {
      POST: "/bfhl (main logic)",
      GET: "/bfhl (simple check)",
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is live at http://localhost:${PORT}`);
});

export default app;
