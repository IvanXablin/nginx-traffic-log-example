import postgres from "postgres";

const sql = postgres({
  host                 : 'postgres-db',
  port                 :  5432,          
  database             : 'postgres',         
  username             : 'postgres',             
  password             : 'example',            
})

export default sql