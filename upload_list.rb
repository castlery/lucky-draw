require 'csv'
require 'time'
require 'net/http'
# This would process the csv file, and return orders

items = %Q{
Song Chern C.
Nicolas B.
Emily N.
Weina L.
Hoe Kuan L.
Moses P.
Meghna M.
Jasmine T.
Amelia F.
Uma R.
Dpd international
May Leng K.
Anthony Y.
Eng Keat P.
Xinjun L.
Jan W.
Amanda T.
Justin C.
Chitra Y
}.split("\n").select{|s| s.length > 0}

times = %w[
5
1
2
1
4
1
1
2
2
1
5
1
2
1
1
2
2
5
1
]

def request(action, data = {})
  uri = URI("http://52.76.49.223:3002//#{action}?#{URI.encode_www_form data}")
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
