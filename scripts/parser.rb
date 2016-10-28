# Parse Ruby
require 'csv'

host = 'http://localhost:3006'
# host = 'http://localhost:3000'
rows = CSV.read('/Users/songyy/Downloads/winnder_list_23.csv') 
# Make HTTP request to load the data
require 'http'

HTTP.post "#{host}/clearCandidates"

HTTP.post "#{host}/setWithReplacement", 
  json: { isWithoutReplacement: 'true'}

names = rows.map do |row| 
  [row[1]] * row[2].to_i
end.flatten.shuffle


# load list of people into the lucky-draw machine
names.each do |name|
  HTTP.post "#{host}/addCandidate", 
    # json: { candidate: "#{row[0]}, #{row[1]}" }
    json: { candidate: name }
end
# rand = HTTP.get 'http://localhost:3000/rand'
