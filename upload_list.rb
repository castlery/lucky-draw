require 'csv'
require 'time'
require 'net/http'
# This would process the csv file, and return orders

items = %Q{
Hizal S.
Muhammad F.
Wilson T.
Elinor C.
Rachel Q.
Su Ling C.
Chay W.
Hana K.
Chuah C.
Mohan M.
Eleana L.
Kit M.
Stephie T.
Joanna A.
Sung Jin L.
Andy L.
}.split("\n").select{|s| s.length > 0}

times = %w[
2
1
2
2
1
1
1
2
3
2
3
3
2
2
1
1
]

def request(action, data = {})
  uri = URI("http://52.76.49.223:3002//#{action}?#{URI.encode_www_form data}")
  #uri = URI("http://localhost:3000//#{action}?#{URI.encode_www_form data}")
  res = Net::HTTP.post_form(uri, {})
end

request('clearCandidates')

chances = []
items.each_with_index do |num, idx|
  times[idx].to_i.times {chances << num }
end

# Add the file into lucky draw machine
chances.shuffle.each do |num|
  puts num
  request('addCandidate', candidate: num)
end
