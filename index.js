document.addEventListener('DOMContentLoaded', function () {
    
    let myLeads = []
    const inputEl = document.getElementById("input-el")
    const inputBtn = document.getElementById("input-btn")
    const ulEl = document.getElementById("ul-el")
    const deleteBtn = document.querySelector("#delete-btn")
    const tabBtn = document.querySelector('#tab-btn')

    const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
    
    if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage
        render(myLeads)
    }
    
    function render(leads) {
        let listItems = ""
        for (let i = 0; i < leads.length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${myLeads[i]}
                    </a>
                </li>
            `
        }
        ulEl.innerHTML = listItems  
    }

    inputBtn.addEventListener("click", function() {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })

    deleteBtn.addEventListener("dblclick", function() {
        localStorage.clear()
        myLeads = []
        render(myLeads)
    })

    tabBtn.addEventListener('click', function(){

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            console.log(tabs)
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))

            render(myLeads)
        })
    })

})