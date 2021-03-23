require 'rails_helper'

RSpec.describe User, type: :model do
  context 'valid Factory' do
    it 'has a valid factory' do
      expect(build(:user)).to be_valid
    end
  end

  context 'validations' do
    before { create(:user) }

    context 'presence' do
      it { should validate_presence_of(:username) }
    end

    context 'uniqueness' do
      it { should validate_uniqueness_of(:username) }
    end
  end
end
