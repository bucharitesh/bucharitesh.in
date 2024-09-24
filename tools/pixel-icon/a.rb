require 'rubygems'
require 'rmagick'
require 'json'

# Constants
BLACK_THRESHOLD = 5910
GRAY_THRESHOLD = 26214

def process_image(image_path)
    begin
        image = Magick::Image.read(image_path).first
        # Check image is exactly 96x96
        if image.rows != 96 || image.columns != 96
            puts "Image #{image_path} is not 96x96" 
            puts "This image will be skipped..."
            return nil
        end

        image.rotate!(90)
        rows = []

        0.step(image.rows - 1, 4) do |i|
            cols = []
            0.step(image.columns - 1, 4) do |j|         
                pixel = image.pixel_color(i + 2, j + 2)
            
                case pixel.intensity
                when 0..BLACK_THRESHOLD
                    cols << 0
                when (BLACK_THRESHOLD + 1)..GRAY_THRESHOLD
                    cols << 1
                else
                    cols << 2
                end
            end 
            rows << cols
        end

        rows
    rescue Magick::ImageMagickError => e
        puts "Error processing image: #{e.message}"
        nil
    end
end

# Example usage:
if ARGV.empty?
    puts "Please provide an image path as an argument."
else
    result = process_image(ARGV[0])
    if result
        puts JSON.pretty_generate(result)
    else
        puts "Failed to process the image."
    end
end