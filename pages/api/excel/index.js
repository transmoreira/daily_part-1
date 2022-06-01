import xlsx from "xlsx"

const NAME_PLAN = "Abastecimento.xlsx"
const NAME_GUIA = "VIGA"
const PATH = "./pages/api/excel/"

const PlanAbastecimento = (request, response)=>{
    console.log(request.body)
    if(request.method != "POST"){
        response.status(400).send({success:false,message:"Erro ao enviar dados..."})
    }
   
    try {
        const workbook = xlsx.readFile(PATH + NAME_PLAN)    
        const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[NAME_GUIA])
        
        sheet.push(JSON.parse(request.body))
        xlsx.utils.sheet_add_json(workbook.Sheets[NAME_GUIA],sheet)

        //const lastRow = sheet.length + 1
        //xlsx.utils.cell_set_hyperlink(workbook.Sheets[NAME_GUIA]["E" + lastRow],"teste")
    
        xlsx.writeFile(workbook,PATH + NAME_PLAN)
        response.send({success:true, message:"Abastecimento gravado com sucesso!", sheet})
    } catch (error) {
        response.status(400).send({success:false, message:"Erro ao enviar dados..."})
    }
    
    
}

export default PlanAbastecimento