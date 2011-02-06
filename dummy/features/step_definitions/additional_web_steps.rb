Then /^the html should contain "([^"]*)"$/ do |text|
  page.body.should include(text)
end