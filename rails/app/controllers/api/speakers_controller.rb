class Api::SpeakersController < ApplicationController
	skip_before_filter :verify_authenticity_token

	def index
		render json: Speaker.all
	end

	def show
		render json: Speaker.find(params[:id])
	end

	def create
		speaker = Speaker.new
		speaker.name = params[:speaker]['name']
		speaker.save!
		render json: speaker
	end

end
