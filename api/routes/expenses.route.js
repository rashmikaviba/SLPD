import express from 'express';
import  Expenses from '../models/expenses.js';
import expenseModel from '../models/expenses.js';

const router = express.Router();

async function getExpense(req, res, next) {
  try {
    const expense = await Expenses.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'expense not found' });
    }
    res.expense = expense;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

router.get('/', async (req, res) => {
  try {
    const expenses = await Expenses.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
    try {
      // Create a new product instance using the data sent in the request body
      const newExpense = new Expenses(req.body);
      // Save the product to the database
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      console.error('Error adding expense:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


//   // DELETE an expense
// router.delete('/:id', getExpense, async (req, res) => {
//   try {
//     await res.expense.remove();
//     res.json({ message: 'Expense deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting expense:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



router.get('/getExpense/:id',async(req,res) =>{
  let id = req.params.id ;

  await expenseModel.findById(id)
  .then((expenseModel) =>{
    res.status(200).send({status:"user fetched" , expenseModel})
  }).catch((err) =>{
    res.status(500).send({status:"Error with user",error : err.message});
  })
})


router.put('/updateExpense/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router ;
