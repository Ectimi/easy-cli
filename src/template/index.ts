import path from 'path';
import fs from 'fs-extra'
import inquirer from 'inquirer';

export const  generateTemplate =  async (name:string,options:{force:boolean})=>{
    const cwd = process.cwd();
    const targetDir = path.join(cwd,name);
    if(fs.existsSync(targetDir)){
        if(options.force){
            await fs.remove(targetDir)
        }else{
            let {action} = await inquirer.prompt([
                {
                    name:'action',
                    type:'list',
                    message:'Target directory already exists,pick an action:',
                    choices:[
                        {
                            name:'Overwrite',
                            value:'overwrite'
                        },
                        {
                            name:'Cancel',
                            value:false
                        }
                    ]
                }
            ])

            if(!action) return;
            else if(action === 'overwrite'){
                console.log('\r\nRemoving...')
                await fs.remove(targetDir)
            }
        }
    }
}