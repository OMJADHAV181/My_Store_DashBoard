import prisma from "../DB/config.js";
import axios from 'axios'
class TransController{
  static async index(req, res) {
    // Extract and parse the query parameters
    let page = parseInt(req.query.page, 10) || 1;
    const month_name = req.query.month;
    
    // List of months to map month names to numbers
    const month_list = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Convert month name to its corresponding number (1-12)
    const month = month_list.indexOf(month_name) + 1;
    
    // If the month is invalid, return an error response
    if (!month || month < 1 || month > 12) {
      return res.status(400).json({ error: "Invalid month parameter. Please provide a valid month name." });
    }
  
    const limit = Number(req.query.limit) || 10; // Default limit is set to 10
    const search = req.query.search || '';
  
    // Ensure the page number is always at least 1
    if (page <= 0) {
      page = 1;
    }
  
    // Calculate the number of records to skip based on the current page
    const skip = (page - 1) * limit;
  
    try {
      // Construct the search conditions based on the search term
      const searchConditions = [];
  
      if (search.trim()) {
        // Add conditions for title and description fields using case-insensitive search
        searchConditions.push(
          { title: { contains: search, mode: 'insensitive' } },
          { Description: { contains: search, mode: 'insensitive' } }
        );
  
        // If the search term is a valid number, add a condition for the price field
        const searchNumber = parseFloat(search);
        if (!isNaN(searchNumber)) {
          searchConditions.push({ price: { equals: searchNumber } });
        }
      }
  
      // Prepare the query options for findMany based on the presence of search conditions
      const queryOptions = {
        where: {
          Month: month, // Ensure the month filter is always applied
          OR: searchConditions.length > 0 ? searchConditions : undefined
        }
      };
  
      // Fetch the filtered transactions with pagination
      const transactions = await prisma.productTransaction.findMany({
        ...queryOptions,
        skip: skip,
        take: limit,
      });
  
      // Count the total number of records that match the search conditions or fetch all records if no search term is provided
      const totalRecords = await prisma.productTransaction.count({
        ...queryOptions,
      });
  
      // Calculate the total number of pages based on the limit
      const totalPages = Math.ceil(totalRecords / limit);
  
      // Send the response with the data and pagination details
      res.status(200).json({
        data: transactions,
        currentPage: page,
        currentLimit: limit,
        totalPages: totalPages,
        totalRecords: totalRecords,
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  
  
      static async getPriceRange(req,res){
        const month_name  = req.query.month;
        const month_list = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = parseInt(month_list.indexOf(month_name))+1
    
        if (!month || month < 1 || month > 12) {
            return res.status(400).json({ error: "Invalid month parameter. Please provide a valid month number (1-12)." });
        }
        const priceRange=[
          {range:"0-100",min:0,max:100},
          {range:"101-200",min:101,max:200},
          { range: '201-300', min: 201, max: 300 },
          { range: '301-400', min: 301, max: 400 },
          { range: '401-500', min: 401, max: 500 },
          { range: '501-600', min: 501, max: 600 },
          { range: '601-700', min: 601, max: 700 },
          { range: '701-800', min: 701, max: 800 },
          { range: '801-900', min: 801, max: 900 },
          { range: '901-above', min: 901, max: Infinity }
        ]
        try{
          const result = await Promise.all(priceRange.map(async (range)=>{
            const itemCount = await prisma.productTransaction.count({
              where:{
                Month:month,
                Price:{
                  gte:range.min,
                  lte:range.max===Infinity ? undefined : range.max
                }
              },
            })
            return {
              range:range.range,
              item_Count:itemCount
            }
          }))
          
          res.status(200).send({
            result
          })


        }catch(error){
          console.error('Error fetching statistics:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
      }
      static async getuniquecategory(req,res){
        const month_name  = req.query.month;
        const month_list = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = parseInt(month_list.indexOf(month_name))+1;
        if(month<1 || month>12 || !month){
          res.status(400).json({error:"Invalid month paramter.Please provide a valid month"})
        }
        try{
          const result = await prisma.productTransaction.groupBy({
            by:["Category"],
            _count:{
              Id:true
            },
            where:{
              Month:month
            }
          })

          const formattedData = result.map(item => ({
            category: item.Category,
            Item_Count: item._count.Id,
          }));
          res.status(200).json({
            data:formattedData

          })


        }catch(error){
          console.log(error)
          res.status(500).json({error: 'Internal server error'})
        }
      }

      static async getStatistics(req, res) {
        const month_name  = req.query.month;
        const month_list = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = parseInt(month_list.indexOf(month_name))+1
    
        if (!month || month < 1 || month > 12) {
            return res.status(400).json({ error: "Invalid month parameter. Please provide a valid month number (1-12)." });
        }
    
        try {
            // Total number of sold items in the selected month
            const totalSoldItem = await prisma.productTransaction.count({
                where: {
                    Month: month, 
                    Sold: true,
                },
            });
    
            // Total sale amount of sold items in the selected month
            const totalSaleAmount = await prisma.productTransaction.aggregate({
                _sum: {
                    Price: true,
                },
                where: {
                    Month: month,
                },
            });
    
            // Total number of not sold items in the selected month
            const totalNotSoldItems = await prisma.productTransaction.count({
                where: {
                    Month: month,
                    Sold: false,
                },
            });
    
            // Respond with the calculated statistics
            res.status(200).send({
                totalSoldItem,
                totalNotSoldItems,
                totalSaleAmount: totalSaleAmount._sum.Price || 0,
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async store(req,res){
        try{

            const respone  = await axios(`https://s3.amazonaws.com/roxiler.com/product_transaction.json`);
            const data = respone.data;
            for(const product of data){
                await prisma.productTransaction.create({
                    data:{
                        title:product.title,
                        Description:product.description,
                        Price:product.price,
                        Sold:product.sold,
                        DateOfSale:product.dateOfSale,
                        Category: product.category,
                        Image:product.image,
                    }
            })
            
        }
        console.log("DataBase Created SucessFully")
        res.status(200).send({message:"DataBase Sucessfully Created"})
        
    }catch(error){
        console.log("DataBase seeding error",error)
        res.status(500).send({message:error})

    }
}

    static async update(req,res){
        try{
            const respone  = await axios(`https://s3.amazonaws.com/roxiler.com/product_transaction.json`);
            const data = respone.data;
            for(const product of data){
                const  date = new Date(product.dateOfSale)
                const year = date.getFullYear();
                const month = date.getMonth();

                await prisma.productTransaction.updateMany({
                    where:{
                        Id:product.id
                    },
                    data:{
                        Year: year,
                        Month:month+1
                    }
                })
            }
            res.status(200).send({message:"DataBase Updated Sucessfully"})

        }catch(error){
            console.error('Error updating the database:', error);
            res.status(500).send({error:error})

        }

    }

    static async delete(){

    }

}
export default TransController;