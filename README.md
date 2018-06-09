# RUT Utils

## Rol Único Tributario (RUT)
Each person registered in the database of the Civil Registry has its own RUT, that is unique and unrepeatable number that useful as a method of identification. This consists of an 8-digit number with a verification digit that can be from 0 to 9 or a K.

## Description
The utilities for the use of the RUT number, consist in a set of tools that allow you to verify the validity of the number, give it a format, and obtain the full name and aditional information of a person that is linked to that Rut number.

## Tools
- Give Format a RUT
- Clean the invalids characters RUT
- Calculate the verifier digit
- Verify if its a valid or invalid RUT
- Get the number of 8 digits or the verifier digit from the RUT
- Get the full name and additional information of a person from the RUT

## Installation
```
npm install rut-utils --save
```

## Examples
```
import RutUtils from 'rut-utils'

const RutTools = new RutUtils()
/*
    Give Format a RUT
    Input: String Rut, boolean dots( true if you want a rut formatted with dots or false if you want without dots ) default is false
*/
RutTools.format("24541681", true) // Returns 2.454.168-1
RutTools.format("24541681") // Returns 2454168-1

/*
    Clean the invalids characters RUT
    Input: String Rut
*/
RutTools.clean("2.454.168-1") // Returns 24541681

/*
    Calculate the verifier digit
    Input: String Rut
*/
RutTools.calculate("2.454.168") // Returns 1
RutTools.calculate("24541681") // Returns 1

/*
    Verify if its a valid or invalid RUT
    Input: String Rut
*/
RutTools.isValid("2.454.168-1") // Returns true if is valid
RutTools.isValid("2.454.168-K") // Returns false if is invalid

/*
    Get the number of 8 digits from the RUT
    Input: String Rut
*/
RutTools.digits("2.454.168-1") // Returns 8-digits 2454168

/*
    Get the verifier digit from the RUT
    Input: String Rut
*/
RutTools.verifier("2.454.168-1") // Returns verifier digit 1

/*
    Get object with the full name and additional info of a person from the RUT
    Input: String data, Boolean ( false is for search by rut, default is false )
*/
RutTools.getInfo("2.454.168-1") // Returns {"nombre":"Caceres Esteban","rut":"24541681","sexo":1}

/*
    Get array with the full name and additional info of a person from the a name person
    Input: String data, Boolean ( true is for search by name )
*/
RutTools.getInfo("Esteban Caceres", true) // Returns [{"name":"Caceres Esteban","rut":"24541681"}, ...]

```

## Test
```
npm test
```

## Credits
- [Roddy Vitali](https://twitter.com/@roddyvitali)

## License
- [MIT](https://github.com/roddyvitali/rut-utils/tree/master/LICENSE)