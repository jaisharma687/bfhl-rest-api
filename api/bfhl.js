import express from "express";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

// ==== Your details ====
const USER_FULL_NAME = "jai_sharma";
const DOB = "17091999";
const EMAIL = "jai.sharma2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BCE3969";
// ======================

function processArray(data) {
  const evenNumbers = [];
  const oddNumbers = [];
  const alphabets = [];
  const specialChars = [];
  let sum = 0;
  let allAlphabetChars = "";

  for (const item of data) {
    const s = String(item);
    if (/^-?\d+$/.test(s)) {
      const num = parseInt(s, 10);
      (num % 2 === 0 ? evenNumbers : oddNumbers).push(s);
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(s)) {
      alphabets.push(s.toUpperCase());
      allAlphabetChars += s;
    } else {
      specialChars.push(s);
    }
  }

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

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' must be an array",
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
    console.error("Error:", err);
    return res.status(500).json({
      is_success: false,
      message: "Internal server error",
    });
  }
});

// Optional GET route
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Wrap for Vercel
export default serverless(app);
