

const Budget = function () {

  this.budgetMonth = 0;
  this.budgetDay   = 0;
  this.deposit     = false;
  this.expensesObj    = {};
  this.incomeObj      = {}; 
  this.additionalIncomeStr = '';
  this.result    = 0 ;
  this.amount    = 0;
  this.expensesMonth = 0;
  this.period = this.periodSelect;
  this.incomePeriod = 0;

  this.mission   = document.querySelector('.target-amount');

  
  this.start = document.getElementById('start');
  this.cancel = document.getElementById('cancel');
  this.incomeAdd = document.querySelector('.income_add');
  this.expensesAdd = document.querySelector('.expenses_add');
  this.deposit = document.getElementById('deposit-check');
  this.income = document.querySelector('.income');
  this.expenses = document.querySelector('.expenses');

  this.budgetMonthValue = document.querySelector('.budget_month-value');
  this.expensesMonthValue = document.querySelector('.expenses_month-value');
  this.budgetDayValue = document.querySelector('.budget_day-value'),
  this.additionalExpensesValue = document.querySelector('.additional_expenses-value');
  this.additionalIncomeValue   = document.querySelector('.additional_income-value');
  this.targetMonthValue = document.querySelector('.target_month-value'); 
  this.incomePeriodValue = document.querySelector('.income_period-value');

  this.periodSelect = document.querySelector('.period-select');
  this.periodAmount = document.querySelector('.period-amount');
  this.incomeAmount = document.querySelectorAll('.income-amount');
  this.expensesAmount = document.querySelectorAll('.expenses-amount');
  this.targetAmount = document.querySelector('.target-amount');
  this.salaryAmount = document.querySelector('.salary-amount');

  this.additionalExpensesItem = document.querySelector('.additional_expenses-item');
  this.additionalIncome = document.querySelectorAll('.additional_income-item');
  this.expensesTitle = document.querySelectorAll('.expenses-title');
  this.incomeTitle = document.querySelectorAll('.income-title');
  this.budget      = document.querySelector('.salary-amount');

}



Budget.prototype.getDayBudget = function() {                 
  return this.budgetDay = parseInt(this.budgetMonth) / 30;          
}

Budget.prototype.getExpensesMonth = function() {
  for(let k in this.expensesObj) {
      this.expensesMonth += parseInt(this.expensesObj[k])
  }
},

Budget.prototype.getTargetMonth = function() {
  return Math.ceil(parseInt(this.mission.value) / this.budgetMonth);
}
Budget.prototype.getadditionalExpenses = function() {
  return this.additionalExpensesItem.value
}
Budget.prototype.getAdditionalIncome = function() {
  this.additionalIncome.forEach( item => {
    return this.additionalIncomeStr += item.value.concat(', ')
  })
}

Budget.prototype.getAccumulatedMonth = function() {
  let res = 0;
  for(let key in this.incomeObj) {
    res += parseInt(this.incomeObj[key])
  }
  for(let key in this.expensesObj) {
    res -= parseInt(this.expensesObj[key])
  }
  return this.budgetMonth = res + +this.budget.value;

}

Budget.prototype.incomePeriodCalc = function() {
  return this.incomePeriod = parseInt(this.periodSelect.value) * parseInt(this.budgetMonth);
}

Budget.prototype.getExpensesMonth = function() {
  for(let key in this.expensesObj) {   
    this.expensesMonth = this.result += parseInt(this.expensesObj[key])    
  }
  return this.result ;
}

Budget.prototype.managingElements = function() {

  this.disableButton();
  this.incomeAdd.addEventListener('click', () => {
    let clonedNode = document.querySelector('.income-items').cloneNode(true);
    this.income.append(clonedNode);      
    this.income.append(this.incomeAdd);  
    let input = [...clonedNode.querySelectorAll('input')];
    input.forEach(el => el.value = '');
    if(document.querySelectorAll('.income-items').length === 3)   {
      this.incomeAdd.style.display = 'none'
    };
  });
  
  this.expensesAdd.addEventListener('click', () => {
      let clonedNode = document.querySelector('.expenses-items').cloneNode(true);
      this.expenses.append(clonedNode);      
      this.expenses.append(this.expensesAdd);
      let input = [...clonedNode.querySelectorAll('input')];
      input.forEach(el => el.value = ''); 
      if(document.querySelectorAll('.expenses-items').length === 3)   {
        this.expensesAdd.style.display = 'none'               
      };     
  });
          
  this.periodSelect.addEventListener('input', () => {
      this.period = this.periodAmount.textContent = this.periodSelect.value;
      if(this.budget.value !== '') 
      this.incomePeriodValue.value =  this.incomePeriod = parseInt(this.period) * parseInt(this.budgetMonth);;
  });

  this.budget.addEventListener('input', () => this.chekedNum(this.budget));

  this.targetAmount.addEventListener('input', () => this.chekedNum(this.targetAmount));
  this.additionalExpensesItem.addEventListener('input', () => this.chekedStr(this.additionalExpensesItem));

  this.incomeAmount.forEach( inc => {
    inc.setAttribute('data-validate', 'true')
    inc.addEventListener('input', () => this.chekedNum(inc));
  });
  this.expensesAmount.forEach( exp => {
    exp.setAttribute('data-validate', 'true')
    exp.addEventListener('input', () => this.chekedNum(exp));
  });
  this.additionalIncome.forEach( item => {
    item.setAttribute('data-validate', 'true')
    item.addEventListener('input', () => this.chekedStr(item) )
  });
  this.expensesTitle.forEach( item => {
    item.setAttribute('data-validate', 'true')
    item.addEventListener('input', () => this.chekedStr(item) )
  });
  this.incomeTitle.forEach( item => {
    item.setAttribute('data-validate', 'true')
    item.addEventListener('input', () => this.chekedStr(item) )
  });
}

Budget.prototype.disableButton = function() {
  this.budget.addEventListener('input', () => {
    this.chekedNum(this.budget);  
    if(this.budget.value === '') this.start.setAttribute('disabled', 'true');
    else this.start.removeAttribute('disabled', 'false');        
  });
  if(this.budget.value === '') this.start.setAttribute('disabled', 'true');
}

Budget.prototype.chekedStr = function(el) {
  let val = el.value;
  el.value = val.replace(/[^!,.а-яА-ЯёЁ0-9\s/\d]/g, '');
  el.setAttribute('placeholder', 'Введите русский текст');
} 

Budget.prototype.chekedNum = (el) => {
  let val = el.value;
  el.value = val.replace(/[^\d]/g, '');
  el.setAttribute('placeholder', 'Введите цифры для расчета')
}

Budget.prototype.render = function() {
  this.budgetMonthValue.value  = isNaN(this.getAccumulatedMonth()) ? 0 : this.getAccumulatedMonth();
  this.budgetMonthValue.value  = isNaN(this.getAccumulatedMonth()) ? this.budget.value : this.getAccumulatedMonth();
  this.expensesMonthValue.value = isNaN(this.getExpensesMonth()) ? 0 : this.getExpensesMonth();

  this.targetMonthValue.value  = isNaN(this.getTargetMonth()) ? 0 : this.getTargetMonth();
  this.incomePeriodValue.value = isNaN(this.incomePeriodCalc()) ? 0 : this.incomePeriodCalc();
  this.additionalIncomeValue.value = this.additionalIncomeStr.slice(0, -1);
  this.additionalExpensesValue.value = this.getadditionalExpenses();
  this.budgetDayValue.value =  isNaN(Math.round(this.getDayBudget())) ? 0 : Math.round(this.getDayBudget());
}

Budget.prototype.getExpenses = function() {
  expensesTitle = document.querySelectorAll('.expenses-title');
  expensesAmount = document.querySelectorAll('.expenses-amount');

  this.expensesAmount.forEach( (expens, i) => {       
    return this.expensesObj[expensesTitle[i+1].value] = expens.value;                
  });
}

Budget.prototype.getIncome = function() {
  incomeAmount = document.querySelectorAll('.income-amount'),
  incomeTitle = document.querySelectorAll('.income-title'),

  incomeAmount.forEach( (income, i) => {    
    return this.incomeObj[incomeTitle[i+1].value] = income.value;                
  });
}

Budget.prototype.reset = function() {
    
  document.querySelectorAll('input').forEach( input => {
    input.removeAttribute("disabled");
    input.value = '';
  });
  this.incomeAdd.removeAttribute("disabled");
  this.expensesAdd.removeAttribute("disabled");

  let income   =   document.querySelectorAll('.income-items');
  let expenses =   document.querySelectorAll('.expenses-items'); 

  for(let i = 1; i< income.length; i++) {
    income[i].remove()
  }
  for(let i = 1; i< expenses.length; i++) {
    expenses[i].remove();
  }
  this.period = this.periodAmount.textContent = this.periodSelect.value = 1;

  this.budgetMonthValue.value  = '';
  this.expensesMonthValue.value = '';
  this.targetMonthValue.value  = '';
  this.incomePeriodValue.value = '';
  this.additionalIncomeValue.value = '';
  this.additionalExpensesValue.value = '';
  this.budgetDayValue.value = '';
  this.expenses    = {};
  this.income      = {}; 
  this.budgetDay = 0;
  this.expensesMonth = 0;

  this.incomeAdd.style.display = ''
  this.expensesAdd.style.display = '' 

  this.start.style.display = 'block';
  this.cancel.style.display = 'none';
  this.disableButton();


}

Budget.prototype.started = function() {
  this.getExpenses();    
  this.getIncome();
  this.getAdditionalIncome();
  this.getExpensesMonth();
  this.getDayBudget();
  this.incomePeriodCalc();
  this.render();
  this.incomeAdd.setAttribute("disabled", "true");
  this.expensesAdd.setAttribute("disabled", "true");

  document.querySelectorAll('input').forEach( input => {
    if(input.className !== 'period-select')  {
      input.setAttribute("disabled", "true");
    }    
  });

  this.start.style.display = 'none';
  this.cancel.style.display = 'block';

  cancel.addEventListener('click', this.reset.bind(this));
}
Budget.prototype.init = function() {
  this.managingElements();
if(this.salaryAmount.value !== '' || this.salaryAmount.value !== null)
  this.start.addEventListener('click', this.started.bind(this));
}

const Mybudget = new Budget()

Mybudget.init()