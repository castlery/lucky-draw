# Parse Ruby
require 'csv'

host = 'http://localhost:3000'
rows = CSV.read('./appointments.csv')

# Make HTTP request to load the data
require 'http'

HTTP.post "#{host}/clearCandidates"

HTTP.post "#{host}/setWithReplacement", 
  json: { isWithoutReplacement: 'true'}



# load list of people into the lucky-draw machine
rows.map do |row| 
  HTTP.post "#{host}/addCandidate", 
    json: { candidate: row.join('-') }
end
# rand = HTTP.get 'http://localhost:3000/rand'
