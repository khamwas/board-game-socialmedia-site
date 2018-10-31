declare @value varchar(20)
set @value = 'fantasy'
declare @sqlText varchar(1000)
set @sqlText = 'SELECT * FROM (SELECT COUNT(*) AS reviews, game_id, AVG(sensory) AS sensory, AVG(fantasy) as fantasy, avg(narrative) as narrative, avg(challenge) as challenge, avg(fellowship) as fellowship, avg(discovery) as discovery, avg(expression) as expression, avg(abnegation) as abnegation
    from game_reviews
    group by game_id) as scores
    join board_games on scores.game_id=board_games.game_id
order by '+ @value +' desc'
--select @sqlText
Exec (@sqlText)



select *
from (select count(*) as reviews, game_id, avg(sensory) as sensory, avg(fantasy) as fantasy, avg(narrative) as narrative, avg(challenge) as challenge, avg(fellowship) as fellowship, avg(discovery) as discovery, avg(expression) as expression, avg(abnegation) as abnegation
    from game_reviews
    group by game_id) as scores
    join board_games on scores.game_id=board_games.game_id
--where board_games.title like '%c%'
order by challenge desc