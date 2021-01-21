const handleChange = (event) => {
  	const listPerson = event.target.value;
  	if (typeof listPerson !== 'undefined' && listPerson.length > 0) {
    // the array is defined and has at least one element
    if (listPerson.indexOf("All") > -1) {
  		if (personName.indexOf("All") == -1) {
  			setPersonName(["All"]);	
  		} else {
  			setPersonName(listPerson.splice(-1,1));
  		}
  		
  	} else   {

  		setPersonName(listPerson);
  	  	}
} else {
	setPersonName(["All"]);	
}
  	


    
  };
  	