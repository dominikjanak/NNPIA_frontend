# NNPIA - frontend
Repozitář fronendové React aplikace semestrálního projektu do NNPIA.

| Master |
|--------|
| [![Java CI with Maven][CI badge master]][CI actions master] |

### O projektu
Celý projekt se zabývá jednoduchou správou citátů. V databází eviduje jednotlivé autory citátů, kategorie a samotné uživatele systému. Každému uživateli je umožněno citát jednou hodnotit. 
Aolikace umožňuje stránkování a řazaní dat.

### Backend 
Tato aplikace je pouze frontendová část psaná v Reactu. Backend je umístěn v jiném [repositáři][Backend].

### Design 
![Dashboad][Dashboard]

### API dokumentace
Celé REST API, komunikační rozhraní, je přehledně [zdokumentováno][Online API docs].

<hr>
<strong>2020 - Bc. Dominik Janák</strong><br />
NNPIA - Univerzita Pardubice

[CI actions master]: https://github.com/janakdom/NNPIA_backend/actions
[CI badge master]: https://github.com/janakdom/NNPIA_backend/workflows/Java%20CI%20with%20Maven/badge.svg
[Online API docs]: https://nnpiabackend.herokuapp.com/swagger-ui.html#/quote-score-controller
[Dashboard]: ./dashboard.png
[Backend]: https://github.com/janakdom/NNPIA_backend
