Результаты запросов кэшируется в localStorage

~~Результаты запросов кэшируется в замыкании функции getBondsDataWithCache~~

Недостатки решения:

1. Отсутствует валидация кэша.
2. Кэш может неограниченно расти по памяти
3. [DONE] При частичном чтении из кэша не сохраняется порядок ввода элементов массива isins и порядок элементов в ответе
4. Нет проверки на наличие обьекта localStorage в среде выполнение

Возможные решения:

1. добавить поле ttl (time-to-live) для каждой записи в объекте cache. При добавлении записи в кэш устанавливать текущий timestamp. При проверке наличия параметров в запросе cache добавить проверку текущего timestapm с временем в ttl поле
2. Предусмотреть возможность очисти кэша

Подзадачи:

1. тесты
2. обьект с методами обновления и чтения из кэша;
3. обертка для создания замыкания

для первой итерации БЕЗ учета недостатков оценка 2 часа
