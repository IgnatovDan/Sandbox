/*
https://leetcode.com/problems/rising-temperature/
Write an SQL query to find all dates' Id with higher temperatures compared to its previous dates (yesterday).
*/

select WeatherToday.id from Weather as WeatherToday
inner join Weather as WeatherYesterday on DATE_ADD(WeatherToday.recordDate, INTERVAL -1 DAY) = WeatherYesterday.recordDate
where WeatherYesterday.temperature < WeatherToday.temperature;

/*
select WeatherToday.id from Weather as WeatherToday, Weather as WeatherYesterday
where 
    WeatherYesterday.temperature < WeatherToday.temperature 
    and DATE_ADD(WeatherToday.recordDate, INTERVAL -1 DAY) = WeatherYesterday.recordDate
*/


/*
select WeatherToday.id from Weather as WeatherToday
where exists(
    select 1 
    from Weather as WeatherYesterday 
    where DATE_ADD(WeatherToday.recordDate, INTERVAL -1 DAY) = WeatherYesterday.recordDate
        and WeatherToday.temperature > WeatherYesterday.temperature
)
*/
