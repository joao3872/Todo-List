let contentInput = document.querySelector('#content')

const btnAddTodo = document.querySelector('#btnAddTodo')

let message = document.querySelector('#message')

let messageInput = document.querySelector('#messageInput')

let messageEdit = document.querySelector('#messageEdit')



contentInput.addEventListener('keyup', () => {
    if (contentInput.value.length < 6) {
        message.textContent = 'Digite uma tarefa com 6 caracteres ou mais.'
        
        btnAddTodo.setAttribute('disabled', true)

        btnAddTodo.classList.add('btnDisabled')

        message.style.display = 'block'
    } else {
        btnAddTodo.removeAttribute('disabled')

        btnAddTodo.classList.remove('btnDisabled')

        message.style.display = 'none'
    }

    messageInput.style.display = 'none'
})


window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoForm = document.querySelector('#todoForm');


    todoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value, 
        }

        if (content.value == '') {
            messageInput.style.display = 'block'

            messageInput.textContent = 'Por favor, digite uma tarefa para adiciona-la !'
        } else {
            todos.push(todo);
            
            messageInput.style.display = 'none'
        }

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos()
    })

	DisplayTodos()
})


function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
        // Criação das tags, que são utilizadas na to-do list.

		const todoItem = document.createElement('div');
		
        todoItem.classList.add('todo-item');

		const input = document.createElement('input');
		
        const content = document.createElement('div');
		
        const actions = document.createElement('div');
		
        const edit = document.createElement('button');

        const confirmEdit = document.createElement('button');
		
        const deleteButton = document.createElement('button');


        
        content.classList.add('todo-content');
		
        actions.classList.add('actions');
		
        edit.classList.add('btnEdit');

        confirmEdit.classList.add('btnConfirmEdit');
		
        deleteButton.classList.add('btnDelete');


        // Insere o input que será responsável por receber o valor do input principal, e "permitir" a edição.
		
        content.innerHTML = `<input type="text" value="${todo.content}" readonly class="input-edit">`;
		

        // Adiciona uma vetor para cada botão.

        edit.innerHTML = `<img src="./images/pen-solid.svg" class="btnAction" />`

        confirmEdit.innerHTML = `<img src="./images/check.svg" class="btnAction" />`

        deleteButton.innerHTML = `<img src="./images/trash-can-solid.svg" class="btnAction" />`


        // Adiciona os elementos em seus respectivos lugares.

		actions.appendChild(edit);

        actions.appendChild(confirmEdit);
		
        actions.appendChild(deleteButton);
		
        todoItem.appendChild(content);
		
        todoItem.appendChild(actions);


		todoList.appendChild(todoItem);


        // Função aplicada pelo o escutador de eventos, para editar uma tarefa por vez.

        edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
		
            input.removeAttribute('readonly');
		
            input.focus();

            input.style.borderBottom = '4px solid #FFF3D1'

            for (let c = 0; c < edit.length; c++) {
                edit[c]
            }

            edit.style.display = 'none'

            confirmEdit.style.display = 'block'


            // Função com escutador de eventos para confirmar a edição.

            
            input.addEventListener('blur', (e) => {
				if (input.value == '') {
                    messageEdit.textContent = 'Digite uma tarefa para editar.'
                    messageEdit.style.display = 'block'
                } else {
                    input.setAttribute('readonly', true);
            
                    todo.content = e.target.value;
            
                    localStorage.setItem('todos', JSON.stringify(todos));

                    DisplayTodos()

                    messageEdit.style.display = 'none'
                }
			})
		})



        // Função aplicada pelo o escutador de eventos, para remover uma tarefa por vez.

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(parameterFilter => parameterFilter != todo);

            /* Na linha acima, é feita a filtragem das tarefas.
            É implementada uma function que faz uma comparação, entre o parâmetro do filter e a tarefa que será removida.
            Com base nesta comparação, é executada a ação de remover a tarefa, justamente pelo valor do parâmetro do filter ser diferente de todo (da tarefa).
            Se substituir a comparação != (diferente), por == (igual) a tarefa não será removida. */
            
            localStorage.setItem('todos', JSON.stringify(todos));
		
            DisplayTodos()
		})

	})
}
