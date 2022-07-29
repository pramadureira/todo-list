let txt_list = [["<sub>Analise Matematica I", 
             ["<s01>Lecture 1", 
               ["<s02>Ver aula"], 
               ["<s02>TPC"]], 
             ["<s01>Lecture 2", 
              ["<s02>Ler livro", 
                 ["<s03>Notas"]]]],

["<sub>Fundamentos da Programacao", 
   ["<s01>hehe"]],

["<sub>Algrebra"],

["<sub>Sistemas"],

["<sub>test", 
   ["<s01>rfgrg"]]]

txt_list = [["<sub>Analise Matematica I", ["<s01>Lecture 1"]]]

function format(list) {
    formattedList = []
    for (let text in list) {
        let code = list[text].substring(0, 5)
        let newText = list[text].substring(5)
        if (code == "<s01>") {
            formattedList.push(`|_ ${newText}`)
        } else if (code == "<sub>") {
            formattedList.push(newText)
        } else {
            let num = parseInt(code.substring(2,4))
            formattedList.push(`${' '.repeat(num)} |_ ${newText}`)
        }
    }
    return formattedList.join('\n')
}


function seeTasks() {
    let flattenTask = txt_list.flat(Infinity)
    let formatedTask = format(flattenTask)
    return formatedTask
}

function isOnTasks(task, listTask) {
    let flattenTasks = listTask.flat()
    return (flattenTasks.indexOf(task) != -1)
}

function addTasktoList(content) {
    content = content.split('-')
    content[0] = `<sub>${content[0]}`
    for (let pos = 1; pos < content.length; pos++) {
        if (pos < 10) {
            content[pos] = `<s0${pos}>${content[pos]}`
        } else {
            content[pos] = `<s${pos}>${content[pos]}`
        }
    }
    let aux1 = txt_list
    for (let pos = 0; pos < content.length; pos++) {
        if (!isOnTasks(content[pos], aux1)) {
            aux1.push([content[pos]])
        }

        for (let i = 0; i < aux1.length; i++) {
            if (aux1[i][0] === content[pos]) {
                aux1 = aux1[i]
                break
            }
        }
    }

    console.log("Task(s) added successfuly.")
}

function delTask(content) {
    content = content.split('-')
    content[0] = `<sub>${content[0]}`
    for (let pos = 1; pos < content.length; pos++) {
        if (pos < 10) {
            content[pos] = `<s0${pos}>${content[pos]}`
        } else {
            content[pos] = `<s${pos}>${content[pos]}`
        }
    }
    let aux1 = txt_list

    for (let pos = 0; pos < content.length; pos++) {
        if (pos != content.length - 1) {
            for (let i = 0; i < aux1.length; i++) {
                if (aux1[i][0] == content[pos]) {
                    aux1 = aux1[i]
                    break
                }
            }
        } else {
            for (let i = 0; i < aux1.length; i++) {
                if (aux1[i][0] == content[pos]) {
                    p = i
                    break
                }
            }
            aux1.splice(p, 1)
        }
    }

    console.log("Task(s) deleted successfuly.")
}


//console.log(seeTasks())
addTask('Algrebra-Prep Teste 1-Resumo-Integrais')
console.log(seeTasks())