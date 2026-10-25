# Сравнение «до/после» переписи title и description (внутренний замер)

Методика идентична: стоп-слова удалены, шингл 3 слова, Jaccard; «до» — восстановленные исходные метаданные, «после» — свежий registry.jsonl.

| Метрика | Было | Стало |
|---|---|---|
| Средняя парная близость title | 7.1% | 7.0% |
| Максимум парной близости title | 15.4% | 15.4% |
| Средняя парная близость title+description | 1.8% | 2.0% |
| Максимум парной близости title+description | 3.8% | 4.3% |
| Пары title >5% | 66 | 66 |
| Шаблонных формул (3-граммы в ≥2, без «| Крупки Мастер») | 3 | 0 |

## Топ пар «после» (title+description)

| Пара | Было | Стало |
|---|---|---|
| kak-vybrat-razdelochnuyu-dosku ↔ uhod-za-doskoy-iz-duba | 5.9% | 4.3% |
| tortsevaya-razdelochnaya-doska ↔ uhod-za-doskoy-iz-duba | 5.9% | 4.3% |
| kak-vybrat-razdelochnuyu-dosku ↔ tortsevaya-razdelochnaya-doska | 6.7% | 3.9% |
| ruchnaya-ili-mashinnaya-zatochka ↔ skolko-stoit-zatochka | 15.4% | 3.7% |
| kak-otpravit-instrument-belpochtoy ↔ uhod-za-doskoy-iz-duba | 6.7% | 2.3% |
| chto-takoe-menazhnitsa ↔ kak-otpravit-instrument-belpochtoy | 9.1% | 2.1% |

## Формулы «после»

