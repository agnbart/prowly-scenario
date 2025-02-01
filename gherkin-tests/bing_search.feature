Feature: Search for "semrush" on Bing with category filter

  Scenario: Search for "semrush" in the "Everything" category
    Given I open Bing search page
    When I search for "semrush"
    And I apply the "Everything" category filter
    Then I should see search results related to "semrush"

  Scenario: Search for "semrush" in the "Videos" category
    Given I open Bing search page
    When I search for "semrush"
    And I apply the "Videos" category filter
    Then I should see video results related to "semrush"

  Scenario: Search for "semrush" in the "News" category
    Given I open Bing search page
    When I search for "semrush"
    And I apply the "News" category filter
    Then I should see news articles related to "semrush"