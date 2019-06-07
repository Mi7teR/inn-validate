# inn-validate
## Валидация ИИН и БИН физических и юридических лиц РК
### Установка
`npm install --save inn-validate`
### Пример использования
```javascript
import {validateINN} from 'inn-validate';
console.log(validateINN({identificationNumber: '811201401188'})); // true
console.log(validateINN({identificationNumber: '811201401188', details: true})); // {birthDate: Tue Dec 01 1981 00:00:00 GMT+0600 (Восточный Казахстан), sex: false}
console.log(validateINN({identificationNumber: '971240001315'})); // true
console.log(validateINN({identificationNumber: '971240001315', details: true})); // {type: "Resident", agencyType: "HeadOffice"}
```
ИИН и БИН в примере взяты с гугл картинок.
