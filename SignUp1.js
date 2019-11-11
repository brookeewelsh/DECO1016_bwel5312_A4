  // These are the constraints used to validate the form
  var constraints = {

    //////////////////////////////////
    ////////SIGN UP PAGE 1 ///////////
    //////////////////////////////////

    firstname: {
      // Your first name is required
      presence: true,
      // And it must be between 3 and 20 characters long
      length: {
        minimum: 1,
      },
      format: {
        // We don't allow anything that a-z and 0-9
        pattern: "[a-z ]+",
        // but we don't care if the username is uppercase or lowercase
        flags: "i",
        message: "can only contain letters"
      }
    },
    lastname: {
      // Last name is required
      presence: true,
      
    },
    username: {
      // You need to pick a username too
      presence: true,
      // And it must be between 3 and 20 characters long
      length: {
        minimum: 3,
        maximum: 20
      },
      format: {
        // We don't allow anything that a-z and 0-9
        pattern: "[a-z0-9]+",
        // but we don't care if the username is uppercase or lowercase
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    gender: {
      // You also need to input your gender
      presence: true,
      // And we restrict the options
      inclusion: {
        within: ["other", "female", "male"],
        // The ^ prevents the field name from being prepended to the error
      }
    },
    date: {
      presence: true, 
    },

      //////////////////////////////////
      ////////SIGN UP PAGE 2 ///////////
      //////////////////////////////////
    address: {
      // Address is required
       presence: true,
    },

    city: {
      // City is required
      presence: true,
    },
      
    state: {
        // You also need to input where you live
        presence: true,
        // And we restrict the countries supported to Sweden
        inclusion: {
          within: ["NSW", "QLD", "VIC", "TAS", "WA", "NT"],
          // The ^ prevents the field name from being prepended to the error
      }
    },

    postcode: {
      // postcode must be a 4 digit long number
      format: {
        pattern: "\\d{4}",
        message: "Postcode must be 4 digits"
      }
    },

      //////////////////////////////////
      ////////SIGN UP PAGE 3 ///////////
      ////////////////////////////////// 

      email: {
        // Email is required
        presence: true,
        // and must be an email (duh)
        email: true
      },

      mobile: {
        // Mobile number is required
        presence: true,
        format: {
          // We don't allow anything that a-z and 0-9
          pattern: "[0-9 ]+",
          // but we don't care if the username is uppercase or lowercase
          flags: "i",
          message: "can only contain numbers"
        }

      },
      
      home: {
        // Home number is required
        presence: true,
        format: {
          // We don't allow anything that a-z and 0-9
          pattern: "[0-9 ]+",
          // but we don't care if the username is uppercase or lowercase
          flags: "i",
          message: "can only contain numbers"
        }
      },

      //////////////////////////////////
      ////////SIGN UP PAGE 4 ///////////
      ////////////////////////////////// 
    occupation: {
        // You also need to input your occupation
        presence: true,
        // And we restrict the Options
        inclusion: {
          within: ["Employed", "Non-Employed", "Student"],
          // The ^ prevents the field name from being prepended to the error
      }
    },

    taxfile: {
      // Taxfile is required
      presence: true,
      format: {
        // We don't allow anything that a-z and 0-9
        pattern: "[0-9 ]+",
        // but we don't care if the username is uppercase or lowercase
        flags: "i",
        message: "can only contain numbers"
      },
      length: {
        minimum: 9
      }
    },

      //////////////////////////////////
      ////////SIGN UP PAGE 5 ///////////
      ////////////////////////////////// 

      medicare: {
        // Medicare is required
        presence: true,
        format: {
          // We don't allow anything that a-z and 0-9
          pattern: "[0-9 ]+",
          // but we don't care if the username is uppercase or lowercase
          flags: "i",
          message: "can only contain numbers"
        },
        length: {
          minimum: 10
        }
      },

      licence: {
        // Licence is required
        presence: true,
        format: {
          // We don't allow anything that a-z and 0-9
          pattern: "[a-z0-9]+",
          // but we don't care if the username is uppercase or lowercase
          flags: "i",
          message: "can only contain numbers and letters"
        }
      },

      Passport: {
        // Passport is required
        presence: true,
        format: {
          // We don't allow anything that a-z and 0-9
          pattern: "[a-z0-9]+",
          // but we don't care if the username is uppercase or lowercase
          flags: "i",
          message: "can only contain numbers and letters"
        },
      }
  };
    

  // Hook up the form so we can prevent it from being posted
  var form = document.querySelector("form");
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form, undefined, firstname, lastname, gender, date);
  });

  // Hook up the inputs to validate on the fly
  var inputs = document.querySelectorAll("input, textarea, select");
  console.log(inputs);
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {

      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name])
    });
  }

  function handleFormSubmit(form, input) {


    // validate the form against the constraints
    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }

  // Updates the inputs with the validation errors
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    form.querySelectorAll("input[name], select[name]").forEach( function(input) {
      // Since the errors can be null if no errors were found we need to handle
      // that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  // Shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, "form-group")
      // Find where the error messages will be insert into
      , messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add("has-error");
      // then we append all the errors
      errors.forEach(function(error) {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add("has-success");
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
      el.parentNode.removeChild(el);
    });
  }

  // Adds the specified error with the following markup
  // <p class="help-block error">[message]</p>
  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }

  function showSuccess() {
    // Done
    alert("Success!");
  }


//////////////////////////////////
////////ID photo////// ///////////
//////////////////////////////////
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
  
  


  //////////////////////////////////
  ////////Local Storge ////////////
  ////////////////////////////////// 


  let name = document.getElementById("firstname");
  console.log(name);
  

  let nameval = localStorage.getItem("firstname");

  //document.body.append(nameval);     show's name value on screen
  
  name.addEventListener("change", function() {
    console.log(name.value);

    localStorage.setItem("firstname", name.value);
  });