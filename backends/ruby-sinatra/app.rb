require "bundler/setup"

require "sinatra"
require "sinatra/json"
require "sinatra/cross_origin"
require "json"

set :port, ENV.fetch("PORT", 3001).to_i
set :bind, "0.0.0.0"

configure do
  enable :cross_origin
end

before do
  response.headers["Access-Control-Allow-Origin"] = "*"
end

PEOPLE = JSON.parse(File.read(File.join(__dir__, "..", "..", "data", "people.json")))

get "/" do
  json status: "ok", service: "fullstack-list-backend-ruby"
end

get "/people" do
  page = [1, (params[:page] || 1).to_i].max
  limit = [[1, (params[:limit] || 10).to_i].max, 100].min

  results = PEOPLE

  total = results.length
  offset = (page - 1) * limit
  data = results[offset, limit] || []

  json data: data, meta: { total: total, page: page, limit: limit }
end

get "/people/:id" do
  halt 404, json(error: "Person not found") unless params[:id].match?(/\A\d+\z/)
  person = PEOPLE[params[:id].to_i]
  halt 404, json(error: "Person not found") unless person
  json person
end
