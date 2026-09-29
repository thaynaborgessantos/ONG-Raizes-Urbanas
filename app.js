document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidade do Menu Hambúrguer
    const botaoMenu = document.getElementById('menu-botao');
    const listaMenu = document.getElementById('menu-lista');

    if (botaoMenu && listaMenu) {
        botaoMenu.addEventListener('click', () => {
            listaMenu.classList.toggle('ativo');
        });
    }

    // 2. Manipulação do Formulário de Cadastro (Cadastros.html)
    const formCadastro = document.querySelector('.form-grid');

    if (formCadastro) {
        // Carregar dados salvos anteriormente no localStorage (Retenção)
        carregarDadosFormulario(formCadastro);

        // Guardar rascunho enquanto o utilizador digita
        formCadastro.addEventListener('input', (evento) => {
            if (evento.target.name) {
                localStorage.setItem(`rascunho_${evento.target.name}`, evento.target.value);
            }
        });

        // Evento de submissão do formulário
        formCadastro.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Impede o recarregamento da página

            if (validarFormulario(formCadastro)) {
                // Guarda o registo definitivo no localStorage
                salvarRegistroFormulario(formCadastro);

                alert('Cadastro realizado com sucesso!');
                
                // Limpa o formulário e o rascunho salvo
                limparRascunhoFormulario(formCadastro);
                formCadastro.reset();
            }
        });
    }
});

// Função para validar campos do formulário
function validarFormulario(form) {
    const cpfInput = form.querySelector('#CPF');
    const emailInput = form.querySelector('#email');

    // Validação de formato de CPF (exemplo básico de padrão)
    if (cpfInput && cpfInput.value) {
        const cpfLimpo = cpfInput.value.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            alert('Por favor, insira um CPF válido com 11 dígitos.');
            cpfInput.focus();
            return false;
        }
    }

    // Validação de Email
    if (emailInput && !emailInput.value.includes('@')) {
        alert('Por favor, insira um endereço de e-mail válido.');
        emailInput.focus();
        return false;
    }

    return true;
}

// Função para salvar dados finais no localStorage
function salvarRegistroFormulario(form) {
    const formData = new FormData(form);
    const dadosObj = {};

    formData.forEach((value, key) => {
        dadosObj[key] = value;
    });

    // Recupera registos existentes ou cria nova lista
    const cadastrosExistentes = JSON.parse(localStorage.getItem('cadastros_raizes')) || [];
    cadastrosExistentes.push(dadosObj);

    // Guarda lista atualizada no localStorage
    localStorage.setItem('cadastros_raizes', JSON.stringify(cadastrosExistentes));
}

// Função para carregar rascunho salvo
function carregarDadosFormulario(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const valorSalvo = localStorage.getItem(`rascunho_${input.name}`);
        if (valorSalvo) {
            input.value = valorSalvo;
        }
    });
}

// Função para limpar rascunhos após submissão com sucesso
function limparRascunhoFormulario(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        localStorage.removeItem(`rascunho_${input.name}`);
    });
}