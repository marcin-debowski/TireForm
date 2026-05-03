# TireForm

## Jakie technologie wybrałeś i dlaczego

> React + Vite - React jako podstawa języka frontendowego oraz Vite jako alternatywa dla standardu Create React App, zapewniająca szybsze działanie aplikacji
> TypeScript - jako standard zapewnienia większego bezpieczeństwa w pokryciu typów danych
> Tailwind CSS - do szybkiego stylowania obiektów
> Zod - gotowa biblioteka pomagająca kontrolować błędy w aplikacji
> Supabase - do szybkiego prototypowania, jak było zasugerowane w zadaniu

## Jak rozwiązałeś kwestię bezpieczeństwa danych

> Zastosowałem plik .env przechowujący zmienne środowiskowe (nie są publikowane na publicznym repozytorium)
> Po stronie Supabase użyłem polityk RLS (Row Level Security) – dostęp dla niezalogowanego użytkownika jest ograniczony tylko do dodawania (INSERT) do bazy oraz odczytu (SELECT), aby móc pobrać z bazy UUID auta i przypisać do niego odpowiednie opony

## Jakie decyzje techniczne podjąłeś (np. struktura danych, sposób budowy formularza,UI)

> Struktura danych - podzieliłem kod na komponenty strony, hooki, schematy oraz typy. Podział miał zapewnić przejrzystość w budowaniu aplikacji: większa logika formularzy miała znaleźć się w hookach, a sam render - w komponentach.
> Sposób budowy formularza - Formularz został podzielony na 2 części:

- dane wstępne - dane auta oraz opcjonalny e-mail
- dane opon - podzielone na osobne formularze dla każdego koła, aby zapewnić przejrzystość w formularzu

> UI - rozwijane listy przy oponach zapewniające przejrzystość, jasną informację o tym, jakie dane wprowadzamy, oraz możliwość zamknięcia niepotrzebnych okienek, aby nie zanieczyszczać ekranu nadmiarem informacji
> Podejscie mobile first - aplikacja została najpierw zaprojektowana z myślą o użytkownikach mobilnych następnie rozszeżona pod użytkowików na komputer - dlatego komunikaty wyświetlają się na górze strony aby były zawsze dobrze widoczne

## Co zrobiłbyś inaczej, gdyby to miało wejść na produkcję

> Zabezpieczenie przed spamem, aby nie były możliwe ataki na projekt
> Globalne powiadomienia Toast informujące o stanie błędów
> Wsparcie dla osób niepełnosprawnych, obsługa strony samą klawiaturą np. zamykanie akordeonów przy pomocy esc
> Opis elementów dla botów skanujących strone
> Testy do strony

## Jakie uproszczenia zrobiłeś świadomie i dlaczego

> Wszystkie pola formularza są tekstem, aby wyświetlał się domyślny placeholder, zamiast wymuszać pola typu numerycznego
> Zgodnie z zaleceniami użytkownik miał mieć tylko opcję do dodawania bez odczytu. Aby zablokować odczyt całkowicie po stronie backendu, można by generować UUID po stronie frontendu i nie musieć odczytywać tej informacji z bazy. Jednak taka opcja wiązałaby się z większym skomplikowaniem i niepotrzebnym ryzykiem kolizji losowych UUID. Zastosowane rozwiązanie (odczyt własnego, nowo utworzonego rekordu) uznałem za słuszne i optymalne
