# encoding: utf-8
require 'acceptance_helper'

describe 'On the page /custom_ordering_on_calculated with sort_by: as a Proc WiceGrid', type: :request, js: true do
  before :each do
    visit '/custom_ordering_on_calculated'
  end

  it 'allows to sort by the result of the Proc' do
    within 'div#grid.wice-grid-container table.wice-grid' do
      expect(page).to have_selector('tbody tr:first-child', text: 'New')

      within 'thead' do
        click_on 'Task Count'
        expect(page).to have_selector('i.fa-arrow-down')
      end

      expect(page).to have_selector('tbody tr:first-child', text: 'New')
      expect(page).to have_selector('tbody tr:first-child td.sorted', text: '3')

      within 'thead' do
        click_on 'Task Count'
        expect(page).to have_selector('i.fa-arrow-up')
      end

      expect(page).to have_selector('tbody tr:first-child', text: 'Duplicate')
      expect(page).to have_selector('tbody tr:first-child td.sorted', text: '10')
    end
  end
end
